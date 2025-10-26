import { describe, it, expect } from "vitest";
import {ESCAPE_CHARACTER, Name} from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Test123", () => {
    it("Test1", () => {
        // Original name string = "oss.cs.fau.de"
        let test: string = "\\ \\ \\ \\ \a";
        console.log(test);
        test = test.replace(new RegExp(ESCAPE_CHARACTER + 'a', 'g'), 'a');
        console.log(test);
        test = test.replace(new RegExp(ESCAPE_CHARACTER + ESCAPE_CHARACTER, 'g'), ESCAPE_CHARACTER);
        console.log(test);
    });

    it("insert", () => {
        let n: string[] = ["oss", "fau", "de"];
        let i: number = 1;
        let c: string = "cs";
        n.splice(i, 0, c);
        console.log(n);
    })

    it("remove", () => {
        let n: string[] = ["oss", "cs", "fau", "de"];
        let i: number = 3;
        n.splice(i, 1);
        console.log(n);
    })
    it("asDataString", () => {
        let n: Name = new Name(["oss\.cs\.fau\.de","people"], '#');
        console.log(n.asDataString());
        expect(n.asDataString(), "oss\\.cs\\.fau\\.de.people")
    })
    it("QS", () => {
        let n: Name = new Name(["Oh\.\.\.","Oh\.\.\."], '.');
        console.log(n.asString());
        let s = "Oh\\.";
        console.log(JSON.stringify(s));
    })
    it("asString", () => {
        let n : Name = new Name(["a\\.\\.", "b\\\\"], '.');
        console.log(n.asString());
    })

    it('asDataString 2', () => {
        let n : Name = new Name (["f.a\\u\\#", "oss\\#de"], '#');
        console.log(n.asDataString());
    });
});
