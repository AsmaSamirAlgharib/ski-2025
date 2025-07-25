using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T>(StoreContext context) : IGenericRepository<T> where T : BaseEntity
    {
        public void Add(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public async Task<int> CountAsync(ISpecifition<T> spec)
        {
            var query = context.Set<T>().AsQueryable();
            query = spec.ApplyCriteria(query);
            return await query.CountAsync();
        }

        public bool Exists(int id)
        {
            return context.Set<T>().Any(x => x.Id == id);
        }

        public async Task<T?> GetByTdAsync(int id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public async Task<T?> GetEntityWithSpec(ISpecifition<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<TResult?> GetEntityWithSpec<TResult>(ISpecifition<T, TResult> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await context.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecifition<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }

        public async Task<IReadOnlyList<TResult>> ListAsync<TResult>(ISpecifition<T, TResult> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }

        public void Remove(T entity)
        {
            context.Set<T>().Remove(entity);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(T entity)
        {
            context.Set<T>().Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
        }

        private IQueryable<T> ApplySpecification(ISpecifition<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(context.Set<T>().AsQueryable(), spec);
        }


        private IQueryable<TResult> ApplySpecification<TResult>(ISpecifition<T, TResult> spec)
        {
            return SpecificationEvaluator<T>.GetQuery<T, TResult>(context.Set<T>().AsQueryable(), spec);
        }
    }
}