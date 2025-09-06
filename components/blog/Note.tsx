/**
 * @import {ReactNode} from 'react'
 */

/**
 * @typedef {'important' | 'info' | 'legacy'} NoteType
 *   Type.
 *
 * @typedef Properties
 *   Properties for `Note`.
 * @property {NoteType} type
 *   Kind.
 * @property {Readonly<ReactNode>} children
 *   Children.
 */

import React from "react";

/** @type {Set<NoteType>} */
const known = new Set(["info", "legacy", "important"]);

/**
 * @param {Readonly<Properties>} properties
 *   Properties.
 * @returns {ReactNode}
 *   Element.
 */
interface NoteProperties {
  type: "important" | "info" | "legacy";
  children: React.ReactNode;
}

export function Note(properties: Readonly<NoteProperties>): React.ReactNode {
  const { children, type } = properties;
  const className = ["note"];

  if (known.has(type)) className.push(type);
  else {
    throw new Error("Unknown note type `" + type + "`");
  }

  return <div className={className.join(" ")}>{children}</div>;
}
