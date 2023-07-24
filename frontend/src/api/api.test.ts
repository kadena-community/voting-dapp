import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useContext } from "react";
import { ChainWebApiContext } from "./api";

// The two tests marked with concurrent will be run in parallel
describe("Chainweb Api", () => {
  it("handles votes as expected", async () => {
    // Because the default context value is the mock api, we don't need specify mocks here
    const { result } = renderHook(() => useContext(ChainWebApiContext));

    // Canidate does not exist yet, getVotes should return null
    expect(await result.current.getVotes("1")).toBe(null);

    // Register new canidate
    await result.current.insert("account", { key: "1", name: "test" });

    // Should now have 0 votes
    expect(await result.current.getVotes("1")).toBe(0);

    // Voter should not be be registered yet
    expect(await result.current.hasUserVoted("account")).toBe(false);

    // Vote for the candiate
    await result.current.vote("account", "1");

    // Should now have 1 votes
    expect(await result.current.getVotes("1")).toBe(1);

    // Voter should be registered
    expect(await result.current.hasUserVoted("account")).toBe(true);
  });
});
