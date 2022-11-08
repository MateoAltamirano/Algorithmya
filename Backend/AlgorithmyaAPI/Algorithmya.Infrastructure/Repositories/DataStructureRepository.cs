using Algorithmya.Core.Entities;
using Algorithmya.Infrastructure.Data;
using Algorithmya.Infrastructure.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Algorithmya.Infrastructure.Repositories
{
    public class DataStructureRepository : IDataStructureRepository
    {
        private readonly AlgorithmyaContext _context;
        public DataStructureRepository(AlgorithmyaContext context)
        {
            _context = context;
        }

        public List<DataStructure> GetDataStructures()
        {
            return _context.DataStructures.ToList();
        }
    }
}
