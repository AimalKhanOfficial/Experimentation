using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProblemSolvingTemplateProject
{
	//Tried to attempt 
	//https://leetcode.com/problems/longest-word-in-dictionary/
	
    class Program
    {
        public static void Main(string[] args)
        {
            var arr = new string[] { "rac", "rs", "ra", "on", "r", "otif", "o", "onpdu", "rsf", "rs", "ot", "oti", "racy", "onpd" };
            var paths = CreateTrie(arr);
            Console.WriteLine(paths);
            //SearchTrie("abde", paths);
            Console.ReadKey();
        }

        public static string CreateTrie(string[] words)
        {
            if (words.Length == 0) return "";
            var counterPerWord = 0;
            var trackForAllWordsCreation = new Dictionary<string, int>();
            var root = new TrieNode ('*')
            {
                Children = new Dictionary<char, TrieNode>()
            };
            TrieNode myLogicalObj = null;
            TrieNode myLogicalChildObj = null;
            for (var i = 0; i < words.Length; i++)
            {
                counterPerWord = 0;
                if (!root.Children.Keys.Contains(words[i][0]))
                {
                    //if there's no Char in trie for this word
                    myLogicalObj = new TrieNode(words[i][0])
                    {
                        Children = new Dictionary<char, TrieNode>()
                    };
                    root.Children.Add(words[i][0], myLogicalObj);
                }
                else
                {
                    //there already is a word for this
                    myLogicalObj = root.Children[words[i][0]];
                    counterPerWord++;
                }
                for (var j = 1; j < words[i].Length; j++)
                {
                    if (!myLogicalObj.Children.Keys.Contains(words[i][j]))
                    {
                        //if there's no Char in trie for this word
                        myLogicalChildObj = new TrieNode(words[i][j])
                        {
                            Children = new Dictionary<char, TrieNode>()
                        };
                        myLogicalObj.Children.Add(words[i][j], myLogicalChildObj);
                    }
                    else
                    {
                        //there already is a word for this
                        myLogicalObj = myLogicalObj.Children[words[i][j]];
                        counterPerWord++;
                    }
                }
                if (!trackForAllWordsCreation.Keys.Contains(words[i]))
                    trackForAllWordsCreation.Add(words[i], counterPerWord);
            }
            return trackForAllWordsCreation.First(a => a.Value == trackForAllWordsCreation.Values.Max()).Key;
        }

        public static bool SearchTrie(string word, TrieNode root)
        {
            var tmp = "";
            var i = 0;
            var copyOfTrie = root.Children;
            while (copyOfTrie != null)
            {
                if (i == word.Length) break;
                if (copyOfTrie.Keys.Contains(word[i]))
                {
                    tmp += copyOfTrie[word[i]].Data;
                    if (tmp == word) break; 
                    copyOfTrie = copyOfTrie[word[i]].Children;
                }
                else
                {
                    Console.WriteLine("Found till: {0}", tmp);
                    return false;
                }
                i++;
            }
            Console.WriteLine("Found All: {0}", tmp);
            return true;
        }
    }

    public class TrieNode
    {
        public char Data { get; set; }
        public IDictionary<char, TrieNode> Children { get; set; }
        public TrieNode(char data)
        {
            this.Data = data;
        }
    }

}
