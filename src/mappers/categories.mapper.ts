import { Category, CategoryDBO, CategoryDTO } from "../models/category.model";

export class CategoriesMapper {
  /**static toDTO(category: Category): CategoryDTO {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  }**/
  static toDTO(category: Category): CategoryDTO {
    const {createdAt , updatedAt , ...rests} = category ;
    return {
      ...rests,
    };
  } 


  /**static toDBO(category: Category): CategoryDBO {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      created_at: category.createdAt.toISOString(),
      updated_at: category.updatedAt.toISOString(),
    };
  }**/
  static toDBO(category: Category): CategoryDBO {
    const {createdAt , updatedAt , ...rests} = category
    return {
      ...rests,
      created_at: createdAt.toISOString(),
      updated_at: updatedAt.toISOString() ,
    };
 }


  /**static fromDBO(dbo: CategoryDBO): Category {
    return {
      id: dbo.id,
      name: dbo.name,
      description: dbo.description,
      createdAt: new Date(dbo.created_at),
      updatedAt: new Date(dbo.updated_at),
    };
  }**/
  static fromDBO(dbo: CategoryDBO): Category {
    const {created_at , updated_at , ...rests} = dbo ;
    return {
      ...rests,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at),
    };
  }
  
}
