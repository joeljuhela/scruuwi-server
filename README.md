# Scruuwi server

## Git hooks

Please add the hooks used in this project to your git config.

```bash
$ git config core.hooksPath .githooks
```

The precommit hook ensures that your files are formatted properly

## Testing

```
deno task test
```

## Development setup

```
deno run -A src/server.ts
```

## Production

```
deno task run:production
```
