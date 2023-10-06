import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse, ServiceResponseError } from '../types/ServiceResponse';

function handleServiceError(error: unknown, defaultErrorMessage: string): ServiceResponseError {
  if (error instanceof Error) {
    const errorMessage = error.message || defaultErrorMessage;
    return {
      status: 'INVALID_DATA',
      data: { message: errorMessage },
    };
  }
  return {
    status: 'INVALID_DATA',
    data: { message: defaultErrorMessage },
  };
}

async function create(product: Product): Promise<ServiceResponse<Product>> {
  try {
    const newProduct = await ProductModel.create(product);

    const responseService: ServiceResponse<Product> = {
      status: 'CREATED',
      data: newProduct.toJSON() as Product,
    };

    return responseService;
  } catch (error) {
    return handleServiceError(error, 'Erro ao criar o produto.');
  }
}

async function findAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  try {
    const products = await ProductModel.findAll();

    const responseService: ServiceResponse<ProductSequelizeModel[]> = {
      status: 'SUCCESSFUL',
      data: products as ProductSequelizeModel[],
    };

    return responseService;
  } catch (error) {
    return handleServiceError(error, 'Erro ao buscar os produtos.');
  }
}

export default {
  create,
  findAll,
};
