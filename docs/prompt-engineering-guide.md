
# Prompt Engineering Guide for Programming Forum

## Core Components

### 1. User Interaction Prompts

```markdown
Purpose: Handle user queries and interactions
Format: {action} {subject} {context}

Examples:
- "Find discussions about {programming_language}"
- "Explain error in {code_snippet}"
- "Suggest solution for {problem_description}"
```

### 2. Code Analysis Prompts

```markdown
Input Format:
{language}
{code_block}
{specific_question}

Example:
JavaScript
function example() {
  // code here
}
What are the potential performance issues?
```

### 3. Knowledge Base Queries

```markdown
Template:
Topic: {main_topic}
Subtopic: {specific_area}
Context: {user_background}
Question: {specific_query}
```

### 4. Best Practices

- Be specific and clear in requirements
- Include relevant context
- Specify expected output format
- Use consistent terminology
- Break complex queries into subtasks

### 5. Safety Checks

- Validate input code snippets
- Check for sensitive information
- Ensure responses meet community guidelines
- Maintain appropriate technical depth

## Example Implementations

### 1. Question Format

```markdown
Title: {brief_description}
Language: {programming_language}
Code:
```{language}
{code_block}
```
Problem: {detailed_description}
Expected Behavior: {what_should_happen}
Current Behavior: {what_is_happening}
Attempted Solutions: {what_was_tried}
```

### 2. Answer Format

```markdown
Solution: {brief_overview}
Code:
```{language}
{solution_code}
```
Explanation: {detailed_explanation}
References: {relevant_links}
```

## Response Guidelines

1. Always include code examples when relevant
2. Provide explanations at appropriate technical level
3. Reference official documentation when applicable
4. Include error handling considerations
5. Suggest best practices and optimization tips

## Quality Metrics

- Response relevance
- Code correctness
- Explanation clarity
- Implementation feasibility
- Best practices adherence
