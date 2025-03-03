// function sendMessage() {
//     let userInput = document.getElementById("userInput").value;
//     if (userInput.trim() === "") return;

//     // Display user message
//     let chatbox = document.getElementById("chatbox");
//     let userMessage = document.createElement("div");
//     userMessage.classList.add("chat-message", "user");
//     userMessage.textContent = userInput;
//     chatbox.appendChild(userMessage);

//     // Generate bot response
//     setTimeout(() => {
//         let botMessage = document.createElement("div");
//         botMessage.classList.add("chat-message", "bot");
//         botMessage.textContent = getBotResponse(userInput);
//         chatbox.appendChild(botMessage);
//         chatbox.scrollTop = chatbox.scrollHeight;
//     }, 500);

//     // Clear input field
//     document.getElementById("userInput").value = "";
// }

// // Simple bot response logic
// function getBotResponse(input) {
//     input = input.toLowerCase();
    
//     if (input.includes("hello")) return "Hi there! How can I help?";
//     if (input.includes("how are you")) return "I'm just a bot, but I'm doing well!";
//     if (input.includes("your name")) return "I am a simple chatbot.";
    
//     return "I'm not sure about that. Can you ask something else?";
// }


//sk-4rt9fMJvvjScN8xC844z5Pm2W4YCwJuf

// const url = "https://api.forefront.ai/v1/chat/completions"
// const api_key =  "sk-4rt9fMJvvjScN8xC844z5Pm2W4YCwJuf" //process.env.FOREFRONT_API_KEY

async function sendMessage () {
    const userInput = document.getElementById("userInput")
    const chatbox = document.getElementById("chatbox")

    const userMessage = userInput.value.trim();
    if(!userMessage) return;

    const userMsgDiv = document.createElement("div")
    userMsgDiv.className = "chat-message", "user"
    userMsgDiv.innerHTML = userMessage
    chatbox.appendChild(userMsgDiv)

    userInput.value = "";

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            // authorization: `Bearer ${api_key}`
        },
        body: JSON.stringify({ 
            model: "alpindale/Mistral-7B-v0.2-hf",
            messages: [
                {
                    "role": "user",
                    "content": userMessage
                }
            ],
            max_tokens: 512,
            temperature: 0.7,
        })
    };

    try {
        const loadingDiv = document.createElement("div");
        loadingDiv.className = "chat-message bot"
        loadingDiv.innerText = "Thinking...."
        chatbox.appendChild(loadingDiv)

        const response = await fetch("https://chatbot-backend-production-8c56.up.railway.app/", options)
        const data = await response.json()
        chatbox.removeChild(loadingDiv)


        let botMessage = data.choices?.[0]?.message?.content || "Sorry, I don't understand that."

        // botMessage = botMessage.replace(/<\)
        botMessage = botMessage.replace(/<\|im_start\|>/g, "").replace(/<\|im_end\|>/g, "").trim();

        const botMsgDiv = document.createElement("div")
        botMsgDiv.className = "chat-message bot"
        botMsgDiv.innerText = botMessage
        chatbox.appendChild(botMsgDiv)
    } catch (error) {
        console.error(error);
    }
}



