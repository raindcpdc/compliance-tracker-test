"use client"
import React, { useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import type { Message } from "ai"

import ReactMarkdown from "react-markdown"

// @note @todo Needs to make the chatbox very very responsive
// @todo Needs to implement a design that is appropriate for a chatbox.
// See v0 and Replit UIs for inspiration.
export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e)
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="text-black p-4">
        <h1 className="text-2xl font-bold text-black">EllenAI</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <span className="font-bold block mb-1">
                {message.role === "user" ? "You" : "Ellen"}
              </span>
              <ReactMarkdown
                components={{
                  strong: ({ ...props }) => (
                    <span className="font-bold" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <footer className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full p-2 pr-12 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                rows={1}
                style={{ maxHeight: "200px" }}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px]"
            >
              Send
            </button>
          </div>
        </form>
      </footer>
    </div>
  )
}
