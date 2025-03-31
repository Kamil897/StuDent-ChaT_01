import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  interface ChatMessage {
    id: number;
    user: string;
    text: string;
    timestamp: string;
  }
  
  @WebSocketGateway({ cors: { origin: '*' } }) // Разрешаем CORS для всех
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    private messages: ChatMessage[] = [];
  
    // Подключение клиента
    handleConnection(client: Socket) {
      console.log(`Клиент подключен: ${client.id}`);
      client.emit('chatHistory', this.messages); // Отправляем историю сообщений при подключении
    }
  
    // Отключение клиента
    handleDisconnect(client: Socket) {
      console.log(`Клиент отключен: ${client.id}`);
    }
  
    // Получаем новое сообщение от клиента
    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() message: ChatMessage) {
      this.messages.push(message);
      this.server.emit('receiveMessage', message); // Отправляем сообщение всем клиентам
    }
  
    // Отправка истории сообщений
    @SubscribeMessage('getMessages')
    handleGetMessages(@ConnectedSocket() client: Socket) {
      client.emit('chatHistory', this.messages);
    }
  }
  