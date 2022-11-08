using Algorithmya.Core.Entities;
using System.Collections.Generic;

namespace Algorithmya.Infrastructure.Interfaces
{
    public interface IDataStructureService
    {
        List<DataStructure> GetDataStructures();
    }
}