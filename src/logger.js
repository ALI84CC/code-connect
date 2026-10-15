import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  ttransports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// 💡 Só adiciona os arquivos se estiver rodando no Node.js (Servidor)
if (typeof window === "undefined") {
  logger.add(
    new winston.transports.File({ filename: "error.log", level: "error" }),
  );
  logger.add(new winston.transports.File({ filename: "combined.log" }));
}

export default logger;
