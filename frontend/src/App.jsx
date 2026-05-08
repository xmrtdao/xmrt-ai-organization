import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Bot, 
  Brain, 
  DollarSign, 
  Settings, 
  TrendingUp, 
  Users, 
  Zap, 
  MessageCircle,
  Send,
  Activity,
  Shield,
  Coins,
  BarChart3,
  Globe,
  Cpu,
  Database,
  Network
} from 'lucide-react'
import './App.css'

function App() {
  const [selectedAgent, setSelectedAgent] = useState('executive')
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [organizationStatus, setOrganizationStatus] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  // Mock data for demonstration
  const agents = [
    {
      id: 'executive',
      name: 'XMRT Executive AI',
      role: 'Strategic Leadership',
      status: 'active',
      icon: Brain,
      description: 'High-level strategic decisions and organizational coordination',
      capabilities: ['Strategic Planning', 'Resource Allocation', 'Stakeholder Communication', 'Governance']
    },
    {
      id: 'operations',
      name: 'XMRT Operations AI',
      role: 'Operational Management',
      status: 'active',
      icon: Settings,
      description: 'Day-to-day operations and process optimization',
      capabilities: ['Process Optimization', 'System Monitoring', 'Workflow Management', 'Quality Assurance']
    },
    {
      id: 'financial',
      name: 'XMRT Financial AI',
      role: 'Financial Management',
      status: 'active',
      icon: DollarSign,
      description: 'Treasury management and DeFi optimization',
      capabilities: ['Treasury Management', 'DeFi Optimization', 'Risk Management', 'Financial Reporting']
    }
  ]

  const mockStatus = {
    name: 'XMRT Fully Automated AI Organization',
    status: 'operational',
    uptime: 2847600, // seconds
    agents: { total: 3, active: 3, inactive: 0 },
    performance: { responseTime: 45, throughput: 1250, errorRate: 0.02 },
    ecosystem: {
      connected: true,
      services: ['XMART Token Management', 'Monero Mining Pool', 'CashDapp Banking', 'DAO Governance', 'DeFi Integration']
    }
  }

  useEffect(() => {
    setOrganizationStatus(mockStatus)
    setIsConnected(true)
    
    // Add welcome message
    setMessages([{
      id: 1,
      agentId: 'executive',
      agentName: 'XMRT Executive AI',
      content: 'Welcome to the XMRT Fully Automated AI Organization! I\'m the Executive AI, and I\'m here to help you understand how our autonomous organization operates. Feel free to ask about our performance, strategy, or any aspect of our operations.',
      timestamp: new Date().toISOString(),
      isAgent: true
    }])
  }, [])

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      agentId: selectedAgent,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      isAgent: false
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/${selectedAgent}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, userId: 'web-user' })
      })
      const data = await res.json()
      const agent = agents.find(a => a.id === selectedAgent)
      const agentResponse = {
        id: Date.now() + 1,
        agentId: selectedAgent,
        agentName: agent.name,
        content: data.response || 'No response from agent',
        timestamp: new Date().toISOString(),
        isAgent: true
      }
      setMessages(prev => [...prev, agentResponse])
    } catch (err) {
      console.error('API error:', err)
      const agent = agents.find(a => a.id === selectedAgent)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        agentId: selectedAgent,
        agentName: agent.name,
        content: `Error: Could not reach AI backend. Ensure server is running at ${API_BASE_URL}`,
        timestamp: new Date().toISOString(),
        isAgent: true
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    return `${days}d ${hours}h`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-8 w-8 text-purple-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">XMRT AI Organization</h1>
                  <p className="text-sm text-purple-300">Fully Automated AI Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isConnected ? "default" : "destructive"} className="bg-green-500/20 text-green-400 border-green-500/30">
                <Activity className="h-3 w-3 mr-1" />
                {isConnected ? 'Connected' : 'Disconnected'}
              </Badge>
              <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                <Globe className="h-4 w-4 mr-2" />
                Visit XMRT.io
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Organization Status */}
          <div className="lg:col-span-3">
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-400" />
                  Organization Status
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Real-time status of the XMRT Fully Automated AI Organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                {organizationStatus && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{organizationStatus.status.toUpperCase()}</div>
                      <div className="text-sm text-purple-300">System Status</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{formatUptime(organizationStatus.uptime)}</div>
                      <div className="text-sm text-purple-300">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{organizationStatus.agents.active}/{organizationStatus.agents.total}</div>
                      <div className="text-sm text-purple-300">Active Agents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{organizationStatus.performance.responseTime}ms</div>
                      <div className="text-sm text-purple-300">Response Time</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Agents Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm h-fit">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-purple-400" />
                  AI Agents
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Select an AI agent to interact with
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agents.map((agent) => {
                  const IconComponent = agent.icon
                  return (
                    <div
                      key={agent.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedAgent === agent.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-purple-500/5'
                      }`}
                      onClick={() => setSelectedAgent(agent.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-6 w-6 text-purple-400 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{agent.name}</h3>
                          <p className="text-xs text-purple-300 mb-2">{agent.role}</p>
                          <p className="text-xs text-gray-400 mb-2">{agent.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {agent.capabilities.slice(0, 2).map((cap, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                                {cap}
                              </Badge>
                            ))}
                          </div>
                          <Badge 
                            variant={agent.status === 'active' ? 'default' : 'secondary'} 
                            className="mt-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                          >
                            {agent.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
                  Chat with {agents.find(a => a.id === selectedAgent)?.name}
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Interact with the AI agent to learn about organizational operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ScrollArea className="h-96 w-full rounded-md border border-white/10 p-4 bg-black/20">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isAgent ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.isAgent
                                ? 'bg-purple-500/20 border border-purple-500/30 text-purple-100'
                                : 'bg-blue-500/20 border border-blue-500/30 text-blue-100'
                            }`}
                          >
                            {message.isAgent && (
                              <div className="text-xs text-purple-300 mb-1 font-semibold">
                                {message.agentName}
                              </div>
                            )}
                            <div className="text-sm">{message.content}</div>
                            <div className="text-xs opacity-70 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about organizational performance, strategy, or operations..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="bg-black/20 border-white/10 text-white placeholder-gray-400"
                    />
                    <Button 
                      onClick={sendMessage}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ecosystem Services */}
          <div className="lg:col-span-3">
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Network className="h-5 w-5 mr-2 text-purple-400" />
                  XMRT Ecosystem Services
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Integrated services managed by the AI organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {organizationStatus?.ecosystem.services.map((service, index) => {
                    const icons = [Coins, Database, DollarSign, Users, BarChart3]
                    const IconComponent = icons[index] || Cpu
                    return (
                      <div key={service} className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
                        <IconComponent className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <h3 className="text-sm font-semibold text-white mb-1">{service}</h3>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Active
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-purple-300 mb-2">
              XMRT Fully Automated AI Organization - Revolutionizing Organizational Management
            </p>
            <p className="text-sm text-gray-400">
              Powered by Eliza AI Framework • Built on XMRT Ecosystem • 
              <a href="https://xmrt.io" className="text-purple-400 hover:text-purple-300 ml-1">
                Learn More at XMRT.io
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

