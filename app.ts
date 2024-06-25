import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';

const start = async () => {
    const fastify = Fastify({
        logger: true
    }).withTypeProvider<TypeBoxTypeProvider>()

    // Uncomment to see the error
    await fastify.register(require('@fastify/response-validation'))

    fastify.addSchema({
        $id: 'commonSchema',
        type: 'object',
        properties: {
            hello: { type: 'string' },
        },
    });

    fastify.post('/', {
        schema: {
            body: { $ref: 'commonSchema#' },
            headers: { $ref: 'commonSchema#' },
            response: { 200: Type.Ref('commonSchema#') },
        }
    }, function (request, reply) {
        reply.send({ hello: 'world', hi: 1 })
    })

    fastify.listen({ port: 3000 }, function (err, address) {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    })
}

start()
