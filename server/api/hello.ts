export default defineEventHandler((event) => {


    const query = getQuery(event)


    console.log(query)
    return {
        hello: query.name
    }
})