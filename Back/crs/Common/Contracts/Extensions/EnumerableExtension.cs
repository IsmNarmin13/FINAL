﻿namespace Contracts.Extensions;

/// <summary>
/// Class for enumerable extension.
/// </summary>
public static class EnumerableExtension
{
    /// <summary>
    /// ForEach extension for enumerable.
    /// </summary>
    /// <typeparam name="T"> The type.</typeparam>
    /// <param name="values"> The enumerable value</param>
    /// <param name="action"> The action.</param>
    public static void ForEach<T>(this IEnumerable<T> values, Action<T> action)
    {
        foreach (var value in values)
        {
            action.Invoke(value);
        }
    }
}
