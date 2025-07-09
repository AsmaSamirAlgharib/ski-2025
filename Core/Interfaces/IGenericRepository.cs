using System;
using Core.Entities;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByTdAsync(int id);
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<T?> GetEntityWithSpec(ISpecifition<T> spec);
    Task<IReadOnlyList<T>> ListAsync(ISpecifition<T> spec);
    Task<TResult?> GetEntityWithSpec<TResult>(ISpecifition<T, TResult> spec);
    Task<IReadOnlyList<TResult>> ListAsync<TResult>(ISpecifition<T, TResult> spec);
    void Add(T entity);
    void Update(T entity);
    void Remove(T entity);
    Task<bool> SaveAllAsync();
    bool Exists(int id);
    Task<int> CountAsync(ISpecifition<T> spec);
}
