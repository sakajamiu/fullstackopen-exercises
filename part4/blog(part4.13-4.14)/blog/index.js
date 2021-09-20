const app = require('./app')
const http = require('http')
const config = require('./utilities/config')
const logger = require('./utilities/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`server running on port ${config.PORT}`)
}) 