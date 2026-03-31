# Treine Viola (migração para Next.js)

Este projeto foi migrado de uma aplicação legada em HTML/CSS/JS puro para **Next.js + React + TypeScript + TailwindCSS**, com uma organização baseada em **Clean Architecture** e estilo **Hexagonal Architecture (Ports & Adapters)**.

## Objetivo da migração

- Evoluir uma base legada para um stack moderno e sustentável.
- Separar responsabilidades (domínio, aplicação, infraestrutura e interface).
- Facilitar testes, manutenção e extensões futuras (gamificação, usuários, captura de áudio etc.).

## Arquitetura adotada

```txt
src/
  domain/                -> regras de negócio puras
    entities/
    services/
  application/           -> casos de uso + portas
    use-cases/
    ports/
  infrastructure/        -> adapters concretos (ex: random)
    adapters/
  interface/             -> UI + hooks React
    components/
    hooks/
  app/                   -> camada de entrega (Next.js App Router)
```

### Mapeamento Clean Architecture

- **Entities (Domain):** `TrainingConfig`, regras de acordes e ciclo.
- **Use Cases (Application):** `ChordSession`, responsável por montar cada etapa do treino.
- **Interface Adapters:** hook `useTrainingSession` e componente `TrainingApp`.
- **Framework & Drivers:** Next.js/Tailwind no `src/app`.

### Mapeamento Hexagonal

- **Porta:** `RandomizerPort`.
- **Adapter:** `MathRandomizerAdapter`.
- **Núcleo:** `ChordSession` depende da porta, não da implementação concreta.

## Como executar

```bash
npm install
npm run dev
```

Aplicação em: `http://localhost:3000`

## Sugestões de próximas tecnologias (para sua aprovação)

1. **Testes de unidade (Vitest + Testing Library)**
   - Cobrir `ChordSession`, `useTrainingSession` e regras de progressão.
2. **State management (Zustand)**
   - Caso o fluxo cresça para múltiplos módulos de estudo.
3. **Validação de contratos (Zod)**
   - Garantir segurança para inputs de configuração e APIs futuras.
4. **Persistência (Prisma + PostgreSQL)**
   - Para usuários, trilhas de estudo e histórico de progresso.
5. **Autenticação (Auth.js / NextAuth)**
   - Login social e sessões para evolução do aluno.
6. **Observabilidade (Sentry + OpenTelemetry)**
   - Erros de produção, tracing e métricas de performance.
7. **PWA (next-pwa)**
   - Uso offline para treino e experiência mobile melhor.

## Legado preservado

Os assets e arquivos antigos foram mantidos em `public/` para referência e compatibilidade:

- `public/IMG`
- `public/Sounds`
- `public/legacy-css`
- `public/legacy-js`
- `public/legacy-index.html`
