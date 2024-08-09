
FROM node:22.6.0-alpine3.20 AS builder

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --chown=appuser:appgroup package.json package-lock.json ./
RUN npm ci --only=production
COPY --chown=appuser:appgroup . .
RUN npm run build


FROM node:22.6.0-alpine3.20 AS production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --chown=appuser:appgroup --from=builder /app/package.json /app/package-lock.json ./
COPY --chown=appuser:appgroup --from=builder /app/node_modules ./node_modules
COPY --chown=appuser:appgroup --from=builder /app/dist ./dist
ENV NODE_ENV=production
USER appuser
EXPOSE 3000
CMD ["node", "dist/app.js"]


FROM node:22.6.0-alpine3.20 AS development

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --chown=appuser:appgroup package.json package-lock.json ./
RUN npm install
COPY --chown=appuser:appgroup . .
USER appuser
EXPOSE 3000

CMD ["npm", "run", "dev"]
