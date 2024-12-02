<template>
    <!-- import icon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

    <!-- Chat button -->
    <button class="btn btn-primary position-fixed end-0 bottom-0 m-3" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvas">
        <span class="fw-bold px-3">Chat</span>
    </button>
    
    <!-- Chat box -->
    <div class="offcanvas offcanvas-end custom-offcanvas" 
            data-bs-scroll="true" 
            tabindex="-1" 
            id="offcanvas">
            <div class="card-header text-bg-dark d-flex justify-content-between align-items-center p-2" 
                data-bs-theme="dark">
                <button type="button" 
                        class="btn-close position-absolute start-0 ms-2" 
                        data-bs-dismiss="offcanvas" 
                        aria-label="Close">
                </button>
                <div class="w-100 d-flex align-items-center flex-grow-1 justify-content-center">
                    <i class="fas fa-comment"></i>
                    <p class="mb-0 ms-2 fw-bold">Chat Box</p>
                </div>
            </div>
        
        <!-- msg -->
        <div class="card-body chat-messages" ref="messageContainer">
            <div v-for="(msg, index) in messages" 
                    :key="index" 
                    :class="['chat-message', msg.username === username ? 'right' : 'left']">
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-username">{{ capitalizeFirstLetter(msg.username) }}</span>
                        <span class="message-timestamp">{{ msg.time }}</span>
                    </div>
                    <span class="message-text" :class="{ 'text-left': msg.username === username }">{{ msg.message }}</span>
                </div>
            </div>
        </div>
        
        <!-- input -->
        <div class="card-footer">
            <div class="input-group">
                <input type="text" 
                        class="form-control"
                        v-model="newMessage"
                        @keyup.enter="sendMessage"
                        :placeholder="`${username}: Type a message...`">
                <button class="btn btn-primary"
                        @click="sendMessage">
                    <i class="fas fa-paper-plane"></i><span class="fw-bold"> Send</span>
                </button>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'ChatBox',
    props: {
        username: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            chatSocket: null,
            messages: [],
            newMessage: ''
        }
    },
    methods: {
        initWebSocket() {
            const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
            const wsUrl = `${protocol}${window.location.host}/chat/`;
            
            this.chatSocket = new WebSocket(wsUrl);
            
            this.chatSocket.onopen = () => {
                console.log("WebSocket connection established");
            };
            
            this.chatSocket.onclose = () => {
                console.log("WebSocket connection closed");
            };
            
            this.chatSocket.onmessage = (e) => {
                const data = JSON.parse(e.data);
                this.messages.push(data);
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            };
        },
        
        sendMessage() {
            if (!this.newMessage.trim()) return;
            
            const messageData = {
                message: this.newMessage,
                username: this.username,
                time: new Date().toLocaleTimeString()
            };
            
            this.chatSocket.send(JSON.stringify(messageData));
            this.newMessage = '';
        },
        
        scrollToBottom() {
            const container = this.$refs.messageContainer;
            container.scrollTop = container.scrollHeight;
        },
        
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
    mounted() {
        this.initWebSocket();
    },
    beforeUnmount() {
        if (this.chatSocket) {
            this.chatSocket.close();
        }
    }
}
</script>

<style scoped>
.custom-offcanvas {
    background-color: rgba(0, 0, 0, 0) !important;
}

.chat-messages {
    max-height: 100vh;
    overflow-y: auto;
    padding: 1rem;
    background: rgba(54, 54, 54, 0.8);

    scrollbar-width: thin;
    scrollbar-color: #42b983 #f1f1f1;
}

.chat-message {
    margin: 5px;
    padding: 5px;
}

.chat-message.right {
    text-align: right;
}

.chat-message.left {
    text-align: left;
}

.message-text {
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word; 
}

.message-content {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 8px;
    max-width: 85%;
}

.right .message-content {
    background-color: #42b983;
    color: white;
    text-align: left;
}

.left .message-content {
    background-color: #f1f1f1;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.message-username {
    font-weight: bold;
    display: block;
    margin-bottom: 4px;
}

.message-timestamp {
    font-size: 0.8em;
    margin-left: 8px;
}

.right .message-timestamp {
    color: #f3e1e1;
}

.left .message-timestamp {
    color: #888;
}

button {
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #3aa876;
}
</style>