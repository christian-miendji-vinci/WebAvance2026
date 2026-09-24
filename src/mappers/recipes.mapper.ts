import { NewRecipe, NewRecipeDTO, Recipe, RecipeDBO, RecipeDTO, UpdateRecipeDTO } from "../models/recipe.model";

export class RecipesMapper {
   /**static toDTO(recipe: Recipe): RecipeDTO { ---------> avant
    const dto: RecipeDTO = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      categoryId: recipe.categoryId,
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      authorId: recipe.authorId,
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt.toISOString(),
    };
    if (recipe.imageUrl !== undefined && recipe.imageUrl !== null) { // ----> condition ? siVraie : siFaux
      dto.imageUrl = recipe.imageUrl;
    }
    return dto;
  }**/
  static toDTO(recipe: Recipe): RecipeDTO { // -----> après
    const dto: RecipeDTO = {
     ...recipe ,
     
      createdAt: recipe.createdAt.toISOString() ,
      updatedAt: recipe.updatedAt.toISOString() ,
      ...(recipe.imageUrl ? {imageUrl : recipe.imageUrl} : {}) // ---> condition ? siVraie : siFaux
    } ;
    return dto ;
  }

    /**static fromNewDTO(dto: NewRecipeDTO, authorId: number): NewRecipe { // -------------> avant
    return {
      title: dto.title.trim(),
      description: dto.description.trim(),
      imageUrl: dto.imageUrl,
      prepTime: dto.prepTime,
      cookTime: dto.cookTime,
      servings: dto.servings,
      difficulty: dto.difficulty,
      categoryId: dto.categoryId,
      tags: dto.tags ? dto.tags : [], // --> condition ? siVraie : siFaux
      ingredients: dto.ingredients,
      steps: dto.steps,
      authorId: authorId,
    };
  }**/
  static fromNewDTO(dto: NewRecipeDTO, authorId: number): NewRecipe { //---> apres
    const toDTO: NewRecipeDTO = {
      ...dto ,
    } ;
    const newRecipe : NewRecipe = {tags: [] , ...toDTO , authorId} ; //si tags existe dans toDTO rien , sinon tags :[] tableau vide de string
   return newRecipe;
  }

  /**static toDBO(recipe: Recipe): RecipeDBO { // ---> avant
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      image_url: recipe.imageUrl,
      prep_time: recipe.prepTime,
      cook_time: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      category_id: recipe.categoryId,
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      author_id: recipe.authorId,
      created_at: recipe.createdAt.toISOString(),
      updated_at: recipe.updatedAt.toISOString(),
    };
  }**/

  static toDBO(recipe : Recipe) : RecipeDBO { // -----> apres
    const {imageUrl , prepTime , cookTime , categoryId , authorId , createdAt , updatedAt ,  ...rests} = recipe ;
    return {
      ...rests ,
      image_url : imageUrl,
      prep_time: prepTime ,
      cook_time : cookTime ,
      category_id : categoryId ,
      author_id : authorId ,
      created_at: createdAt.toISOString() ,
      updated_at: updatedAt.toISOString() ,
    }
  }  

  

  /**static fromDBO(dbo: RecipeDBO): Recipe {
    return {
      id: dbo.id,
      title: dbo.title,
      description: dbo.description,
      imageUrl: dbo.image_url,
      prepTime: dbo.prep_time,
      cookTime: dbo.cook_time,
      servings: dbo.servings,
      difficulty: dbo.difficulty,
      categoryId: dbo.category_id,
      tags: dbo.tags ? dbo.tags : [],
      ingredients: dbo.ingredients ? dbo.ingredients : [],
      steps: dbo.steps ? dbo.steps : [],
      authorId: dbo.author_id,
      createdAt: new Date(dbo.created_at),
      updatedAt: new Date(dbo.updated_at),
    };
  }**/
 static fromDBO(dbo: RecipeDBO): Recipe {
    const {created_at , updated_at , image_url , prep_time , cook_time , category_id ,author_id , ...rests} = dbo ;
    return {
      ...rests,
      imageUrl : image_url,
      prepTime : prep_time,
      cookTime : cook_time,
      categoryId: category_id,
      authorId: author_id,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at),
    } ;
  }

  static fromUpdateDTO(dto : UpdateRecipeDTO) : Partial<Recipe> {
    return {
      ...dto ,
      ...(dto.tags ? {tags: dto.tags} : {}) ,
    } ;
  }

}
