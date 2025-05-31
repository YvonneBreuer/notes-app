import { renderHook, act } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import { useLocalStorageSync } from "@/hooks/useLocalStorageSync";

describe("useLocalStorageSync", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("initializes with empty array if localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorageSync<{ foo: string }>("test-key")
    );
    expect(result.current[0]).toEqual([]);
  });

  test("saves and loads data from localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorageSync<{ foo: string }>("test-key")
    );
    act(() => {
      result.current[1]([{ foo: "bar" }]);
    });
    // Re-render to simulate reload
    const { result: result2 } = renderHook(() =>
      useLocalStorageSync<{ foo: string }>("test-key")
    );
    expect(result2.current[0]).toEqual([{ foo: "bar" }]);
  });
});
