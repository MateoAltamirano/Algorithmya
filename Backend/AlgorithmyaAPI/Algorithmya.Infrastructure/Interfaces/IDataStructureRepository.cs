using Algorithmya.Core.Entities;
using System.Collections.Generic;

namespace Algorithmya.Infrastructure.Interfaces
{
    public interface IDataStructureRepository
    {
        List<DataStructure> GetDataStructures();
    }
}
