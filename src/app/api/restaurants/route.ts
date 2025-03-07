export async function POST(req: Request) {
    try {
      const { restaurantName, category, openingHours, deliveryTime, description } = await req.json();
      
      // Os dados no banco aqui
      // await db.restaurant.create({
      //   data: { restaurantName, category, openingHours, deliveryTime, description }
      // });
  
      return new Response(JSON.stringify({ message: 'Informações do restaurante salvas com sucesso!' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Erro ao salvar informações do restaurante' }), { status: 500 });
    }
  }
  