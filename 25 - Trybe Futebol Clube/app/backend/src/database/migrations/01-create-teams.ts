import { Model, QueryInterface, DataTypes } from 'sequelize';
import { ITeam } from '../../Interfaces/ITeam';
import TeamModel from '../models/TeamModel';

// ? Função para inicializar o modelo Team
const initTeamModel = async (sequelize: any) => {
  await TeamModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'team_name',
    },
  }, {
    sequelize,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  });
};

export default {
  up: async (queryInterface: QueryInterface) => {
    const sequelize = queryInterface.sequelize;

    // ? Inicialize o modelo Team com a instância sequelize
    await initTeamModel(sequelize);

    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      }
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('teams');
  }
};
