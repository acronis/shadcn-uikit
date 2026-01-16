/**
 * AI Service for generating realistic chat responses
 * This is a demo implementation that generates contextual responses
 * based on keywords and patterns in the user's input
 */

interface AIResponse {
  content: string
  badges?: Array<{ text: string; variant?: 'default' | 'outline' | 'secondary' }>
}

/**
 * Generate a realistic AI response based on user input
 */
export async function generateAIResponse(userMessage: string): Promise<AIResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

  const lowerMessage = userMessage.toLowerCase()

  // Contextual responses based on keywords
  if (lowerMessage.includes('feedback') || lowerMessage.includes('triage')) {
    return {
      content: `I'll help you analyze customer feedback triage strategies.

**Key Framework Recommendations:**

**RICE Prioritization Model**
- Reach: Number of customers affected
- Impact: Degree of improvement
- Confidence: Certainty in estimates
- Effort: Time and resources required

**Categorization Approach**
1. **Urgent Issues** - Critical bugs, security concerns
2. **Feature Requests** - New functionality suggestions
3. **Improvements** - Enhancement to existing features
4. **Questions** - Support and clarification needs

**Modern Tools & AI/NLP Solutions**
- Sentiment analysis for priority detection
- Automatic categorization using ML models
- HEART framework (Happiness, Engagement, Adoption, Retention, Task Success)
- Kano Model for feature prioritization

Would you like me to dive deeper into any specific framework or provide implementation examples?`,
      badges: [
        { text: 'Product Management', variant: 'outline' },
        { text: 'AI/ML', variant: 'outline' },
      ],
    }
  }

  if (lowerMessage.includes('security') || lowerMessage.includes('cybersecurity')) {
    return {
      content: `Here's a comprehensive overview of modern cybersecurity best practices:

**Core Security Principles:**

**1. Zero Trust Architecture**
- Never trust, always verify
- Micro-segmentation of networks
- Continuous authentication and authorization

**2. Defense in Depth**
- Multiple layers of security controls
- Endpoint protection
- Network security
- Application security

**3. Key Implementation Areas**
- Multi-factor authentication (MFA)
- Encryption at rest and in transit
- Regular security audits and penetration testing
- Incident response planning
- Security awareness training

**Emerging Threats:**
- AI-powered attacks
- Supply chain vulnerabilities
- Cloud misconfigurations
- Ransomware evolution

Would you like specific recommendations for any particular area?`,
      badges: [
        { text: 'Security', variant: 'outline' },
        { text: 'Best Practices', variant: 'outline' },
      ],
    }
  }

  if (lowerMessage.includes('design') || lowerMessage.includes('ui') || lowerMessage.includes('ux')) {
    return {
      content: `Let me share insights on modern UI/UX design principles:

**Core Design Principles:**

**1. User-Centered Design**
- Understand user needs and pain points
- Create user personas and journey maps
- Conduct usability testing

**2. Visual Hierarchy**
- Use size, color, and spacing effectively
- Guide user attention to important elements
- Maintain consistency across interfaces

**3. Accessibility (WCAG)**
- Color contrast ratios (4.5:1 minimum)
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators

**Modern Trends:**
- Design systems and component libraries
- Dark mode support
- Micro-interactions and animations
- Responsive and adaptive design

**Tools & Frameworks:**
- Figma for design collaboration
- Tailwind CSS for utility-first styling
- React/Vue for component-based architecture

What specific aspect would you like to explore further?`,
      badges: [
        { text: 'Design', variant: 'outline' },
        { text: 'UX', variant: 'outline' },
      ],
    }
  }

  if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('development')) {
    return {
      content: `I can help with software development best practices:

**Clean Code Principles:**

**1. Readability**
- Use meaningful variable and function names
- Keep functions small and focused
- Write self-documenting code

**2. SOLID Principles**
- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

**3. Testing Strategy**
- Unit tests for individual components
- Integration tests for system interactions
- End-to-end tests for user workflows

**Modern Development Practices:**
- Version control with Git
- CI/CD pipelines
- Code reviews and pair programming
- Documentation and API design
- Performance optimization

**Popular Tech Stacks:**
- Frontend: React, Vue, TypeScript
- Backend: Node.js, Python, Go
- Database: PostgreSQL, MongoDB, Redis

What specific technology or concept would you like to discuss?`,
      badges: [
        { text: 'Development', variant: 'outline' },
        { text: 'Best Practices', variant: 'outline' },
      ],
    }
  }

  // ELIZA-style responses for unknown messages
  return generateElizaResponse(userMessage)
}

/**
 * Generate ELIZA-style conversational responses
 * Based on classic pattern matching and reflection techniques
 */
function generateElizaResponse(input: string): AIResponse {
  const lowerInput = input.toLowerCase()

  // Pattern: "I am/I'm ..."
  if (lowerInput.match(/\b(i am|i'm)\b/)) {
    const responses = [
      `How long have you been ${input.toLowerCase().replace(/.*\b(i am|i'm)\s+/, '')}?`,
      `Why do you tell me you're ${input.toLowerCase().replace(/.*\b(i am|i'm)\s+/, '')}?`,
      `Do you believe it's normal to be ${input.toLowerCase().replace(/.*\b(i am|i'm)\s+/, '')}?`,
    ]
    return {
      content: responses[Math.floor(Math.random() * responses.length)],
    }
  }

  // Pattern: "I feel ..."
  if (lowerInput.match(/\bi feel\b/)) {
    return {
      content: `Tell me more about these feelings. What makes you feel this way?`,
    }
  }

  // Pattern: "I need ..."
  if (lowerInput.match(/\bi need\b/)) {
    const need = input.toLowerCase().replace(/.*\bi need\s+/, '')
    return {
      content: `Why do you need ${need}? What would having ${need} mean to you?`,
    }
  }

  // Pattern: "Why ..."
  if (lowerInput.startsWith('why')) {
    return {
      content: `That's an interesting question. Why do you think that might be? What's your intuition telling you?`,
    }
  }

  // Pattern: "Can you ..."
  if (lowerInput.match(/\bcan you\b/)) {
    return {
      content: `I can certainly try to help. What specific aspect would you like me to focus on? The more details you provide, the better I can assist you.`,
    }
  }

  // Pattern: Questions with "what", "how", "when", "where"
  if (lowerInput.match(/\b(what|how|when|where)\b/)) {
    const responses = [
      `That's a thoughtful question. Let me help you explore this. Could you provide more context about what you're trying to achieve?`,
      `Interesting question! To give you the most relevant answer, could you tell me more about your specific situation or use case?`,
      `I'd be happy to help with that. What's the broader context? Understanding your goals will help me provide better guidance.`,
    ]
    return {
      content: responses[Math.floor(Math.random() * responses.length)],
    }
  }

  // Pattern: Short inputs (1-3 words)
  if (input.trim().split(/\s+/).length <= 3) {
    const responses = [
      `Could you elaborate on that? I'd like to understand better so I can provide more helpful insights.`,
      `Tell me more about what you mean by "${input}". What specific aspect interests you?`,
      `That's quite concise! Could you expand on what you'd like to know about "${input}"?`,
    ]
    return {
      content: responses[Math.floor(Math.random() * responses.length)],
    }
  }

  // Default conversational response
  const defaultResponses = [
    {
      content: `I understand you're asking about: "${input}"

I can help you with:
- **Analysis and Research** - Deep dive into topics with structured insights
- **Best Practices** - Industry standards and recommendations
- **Technical Guidance** - Implementation strategies and frameworks
- **Problem Solving** - Breaking down complex challenges

Could you provide more details about what specific aspect you'd like to explore? For example:
- What's your main goal or challenge?
- Are you looking for strategic guidance or technical implementation?
- Do you have any specific constraints or requirements?

I'm here to provide detailed, actionable insights tailored to your needs.`,
    },
    {
      content: `That's an interesting topic! To give you the most relevant response, could you help me understand:

**What's your context?**
- Are you exploring this for a project, learning, or solving a specific problem?
- What's your current level of familiarity with this topic?

**What's your goal?**
- Are you looking for an overview, detailed implementation, or best practices?
- Do you have any specific constraints or requirements?

The more context you provide, the more tailored and useful my response can be!`,
    },
    {
      content: `I'd love to help you with that! Let me ask a few clarifying questions to ensure I give you the most relevant information:

**Scope:**
- Are you looking for a high-level overview or detailed technical guidance?
- Is this for a specific use case or general understanding?

**Background:**
- What do you already know about this topic?
- What's prompted this question?

Feel free to share as much or as little as you'd like - I'll adapt my response accordingly!`,
    },
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}
