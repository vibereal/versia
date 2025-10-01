import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fabricImage, personImage, clothingConfig } = await req.json();

    if (!fabricImage || !personImage) {
      return new Response(
        JSON.stringify({ error: 'Both fabric and person images are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Build clothing description based on config
    let clothingDescription = "";
    switch (clothingConfig?.type) {
      case "formal-tshirt":
        const sleeve = clothingConfig.sleeveType === "long" ? "long-sleeved" : "short-sleeved";
        const collar = clothingConfig.collarType === "shanghai" ? "shanghai collar" : "ordinary collar";
        clothingDescription = `${sleeve} formal batik shirt with ${collar}`;
        break;
      case "suit":
        clothingDescription = "formal batik suit jacket";
        break;
      case "psh":
        clothingDescription = "PSH (Pakaian Seragam Harian) uniform with batik pattern, featuring short sleeves, chest pockets with button flaps, and a formal structured design";
        break;
      case "pdu-pramuka":
        clothingDescription = "PDU Pramuka scout uniform with batik pattern, featuring short sleeves, chest pockets with button flaps, scout badges, and official scout uniform styling";
        break;
      case "jaket-jas":
        clothingDescription = "formal batik blazer (jaket jas)";
        break;
      default:
        clothingDescription = "formal batik shirt";
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Starting AI image processing...');

    // Use Lovable AI with google/gemini-2.5-flash-image-preview (Nano Banana)
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Take the person from image 2 and seamlessly place them in ${clothingDescription}, using the pattern from image 1. Ensure the batik pattern is realistically applied to the clothing, making it appear as if the person is actually wearing it. Retain the person's facial features, pose, and body shape with perfect consistency. Apply the batik pattern only to the clothing, not to skin or face. Adjust the lighting to replicate a professional studio environment with warm white light, matching the lighting and shadows accordingly. Replace the background with a clean white studio backdrop. Ensure all elements of the scene align as if it were taken in a professional photo studio. Make the clothing look luxurious, well-fitted, and high-end with proper fabric draping and texture.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: fabricImage
                }
              },
              {
                type: 'image_url',
                image_url: {
                  url: personImage
                }
              }
            ]
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      throw new Error(`AI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('AI response received');

    // Extract the generated image
    const generatedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generatedImage) {
      throw new Error('No image returned from AI');
    }

    return new Response(
      JSON.stringify({ image: generatedImage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in apply-batik-pattern:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
