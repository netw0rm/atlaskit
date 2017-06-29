// @flow

export type Author = {|
  name: string,
  avatarUrl: string,
|}

export type Quote = {|
  id: string,
  content: string,
  author: Author
|}
