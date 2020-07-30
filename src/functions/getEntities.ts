// export function getEntities () {
//     const entities = ['Article', 'Comment', 'Image', 'Role', 'Upvote', 'User']
//     return entities.map((entity) => import('./entity/' + entity))
// }

// export function getEntities(included?: string[]): Function[] {
//     const context = require.context("./entity/", true, /\.ts$/);
//     return context.keys().reduce((acc, path) => {
//         const entityModule = context(path);
//         const [entityName] = Object.keys(entityModule);

//         console.log(entityModule, entityName);
//         // if (entityModule[entityName] && entityModule[entityName].prototype instanceof AbstractEntity) {
//         //     // Skip not explicitly included entities
//         //     if (included && !included.includes(entityName)) {
//         //         return acc;
//         //     }

//         //     acc.push(entityModule[entityName]);
//         // }

//         return acc;
//     }, []);
//     return [];
// }
