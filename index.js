import Produto from './modelo/produto.js';
import Categoria from './modelo/categoria.js'
import CategoriaDAO from './persistencia/categoriaDAO.js';

// const categoria = new Categoria(1, 'Calçados Infantis');
// categoria.gravar().then(() => {
//     console.log(categoria.id)
// })


const categoria = new CategoriaDAO();
categoria.consultar('calçado').then((listaCategorias) => {
    console.log(listaCategorias);
})
const produto = new Produto(1, 'Tênis Allstar', 55.36, 159.99, 'indeterminada', 10, categoria);

console.log(produto.toJSON());