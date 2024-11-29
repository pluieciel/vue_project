<template>
    <!-- chatbox -->
    <div class="chat-container">
        <!-- button -->
        <button class="btn btn-primary end-0 bottom-0 m-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <span class="fw-bold px-3">Chat</span>
        </button>
        
        <!-- content -->
        <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="card-header text-bg-dark d-flex align-items-center p-2" data-bs-theme="dark">
                <button1 type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button1>
                <p class="px-3 fw-bold mb-0">Chat Box</p>
            </div>
            <div class="card-body chat-messages">
                <!-- msg -->
            </div>
            <div class="card-footer">
                <input type="text" class="form-control"
                    :placeholder="`${username}: Type a message...`">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatBox',
    props: {
        username: String
    },
    data() {
        return {
            togglechat: false,
        }
    }
}
</script>

<style scoped>
.chat-container {
    position: fixed;
    right: 0;
    bottom: 0;
    transition: all 0.3s ease;
    z-index: 1000;
}

.chat-toggle {
    z-index: 1001;
}

.chat-content {
    width: 0;
    height: 100vh;
    overflow: hidden;
    transition: all 0.3s ease;
    background: white;
}

.chat-expanded .chat-content {
    width: 300px;
}

.chat-messages {
    height: 300px;
    overflow-y: auto;
}

.card-footer {
    background: white;
    border-top: 1px solid #dee2e6;
    padding: 10px;
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