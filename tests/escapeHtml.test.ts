import { describe, it, expect } from "vitest";
import { escapeHtml } from "@/lib/escapeHtml";

describe("escapeHtml", () => {
  it("tehlikeli HTML karakterlerini kaçırır", () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
    );
  });

  it("tek tırnak ve & işaretini kaçırır", () => {
    expect(escapeHtml("Tom & Jerry's")).toBe("Tom &amp; Jerry&#39;s");
  });

  it("zararsız metni değiştirmez", () => {
    expect(escapeHtml("Şevket Pekmezoğlu 0535")).toBe("Şevket Pekmezoğlu 0535");
  });

  it("boş metni destekler", () => {
    expect(escapeHtml("")).toBe("");
  });

  it("img onerror payload'ını etkisiz hale getirir", () => {
    const out = escapeHtml('"><img src=x onerror=alert(1)>');
    expect(out).not.toContain("<img");
    expect(out).not.toContain('">');
  });
});
