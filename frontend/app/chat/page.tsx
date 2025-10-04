"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ChatForm() {
  const [messages, setMessages] = useState([
    { text: 'Olá! Como posso ajudar você hoje?', sender: 'ai' },
    { text: 'Quero saber mais sobre o shadcn!', sender: 'user' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      // Simula resposta da IA (substitua por chamada à API real)
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: 'Resposta da IA: Entendido!', sender: 'ai' }]);
      }, 500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log('Formulário enviado:', formData);
      // Aqui você chamaria sua API ou lógica de backend
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-background text-foreground">
      {/* Lado esquerdo: Formulário */}
      <div className="w-1/2 p-6 flex flex-col border-r border-border">
        <h2 className="text-lg font-semibold mb-4">Formulário</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nome
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Seu nome"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="seu@email.com"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Mensagem
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Digite sua mensagem..."
              className="w-full h-20"
            />
          </div>
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </div>

      {/* Lado direito: Chat */}
      <div className="w-1/2 flex flex-col">
        <div className="p-4 border-b border-border bg-muted/50">
          <h2 className="text-lg font-semibold">Chat com IA</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg shadow-sm ${
                  msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  );
}