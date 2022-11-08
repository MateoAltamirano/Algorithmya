using Algorithmya.Core.Entities;
using Algorithmya.Core.Exceptions;
using Algorithmya.Infrastructure.Interfaces;
using System.Collections.Generic;

namespace Algorithmya.Infrastructure.Services
{
    public class DataStructureService : IDataStructureService
    {
        private readonly IDataStructureRepository _dataStructureRepository;
        public DataStructureService(IDataStructureRepository dataStructureRepository)
        {
            _dataStructureRepository = dataStructureRepository;
        }
        public List<DataStructure> GetDataStructures()
        {
            var dataStructures = _dataStructureRepository.GetDataStructures();
            if (dataStructures == null)
            {
                throw new AlgorithmyaException(string.Format(AlgorithmyaExceptionMessages.NotFound, "Data Structures"), AlgorithmyaExceptionType.NotFound);
            }

            return dataStructures;
        }
    }
}
