// export async function POST(req: Request) {
//     try {
//         const body = await req.json();

//         // URL real do backend Java
//         const apiUrl = "http://localhost:8080/api/restaurants";  

//         const response = await fetch(apiUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(body),
//         });

//         if (!response.ok) {
//             throw new Error(`Erro do servidor: ${response.statusText}`);
//         }

//         return new Response(JSON.stringify({ message: 'Informações do restaurante salvas com sucesso!' }), { status: 200 });
//     } catch (error) {
//         console.error("Erro ao salvar restaurante:", error);
//         return new Response(JSON.stringify({ message: 'Erro ao salvar informações do restaurante' }), { status: 500 });
//     }
// }

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch("http://localhost:8080/dishes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Erro do mock: ${response.statusText}`);
        }

        return new Response(JSON.stringify({ message: 'Prato salvo com sucesso!' }), { status: 200 });
    } catch (error) {
        console.error("Erro ao salvar prato:", error);
        return new Response(JSON.stringify({ message: 'Erro ao salvar prato' }), { status: 500 });
    }
}
