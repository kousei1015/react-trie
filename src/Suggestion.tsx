import { useState } from "react";
import Trie from "./trie-class/Trie";

const SearchWithTrie = () => {
  const [query, setQuery] = useState<string>("");

  // サジェスト候補の文字が入る配列
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // 先に書いたTrieクラスをインスタンス化しておく
  const trie = new Trie();

  // 下記の配列は、サンプルのデータです。以下の中の文字列が、サジェスト候補として表示されます。
  const sampleWords = ["car", "card", "camp", "cut", "cup", "data"];
  
  // ここで、sampleWordsの配列を一つづつ展開し、その文字列をTrie構造にinsertしておきます。
  sampleWords.forEach((word) => trie.insert(word));

  // ユーザーがinputタグに入力するたびに、サジェスト候補として表示するべき単語を絞って、再レンダリングさせている
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const foundSuggestions = trie.startsWith(value);
      setSuggestions(foundSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="文字を入れて下さい"
        style={{
          margin: "2rem auto",
          padding: "0.25rem",
          display: "block",
          width: "400px",
        }}
      />
      <h2 style={{ textAlign: "center" }}>検索候補</h2>
      {suggestions.length > 0 && (
        <ul style={{ listStyle: "none", textAlign: "center" }}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchWithTrie;
