import Data.Char
data Tree a = EmptyTree | Node a (Tree a) (Tree a)

instance (Show a) => Show (Tree a) where
	show x = show1 0 x

instance Functor Tree where
	 fmap _  EmptyTree = EmptyTree
	 fmap f (Node a left right) = Node (f a) (fmap f left) (fmap f right)

show1 :: (Show a) => Int -> (Tree a) -> String
show1 n EmptyTree = ""
show1 n (Node a left right) =
	show1 (n+1) right ++
	indent n ++ show a ++ "\n" ++
	show1 (n+1) left

indent :: Int -> String
indent n = replicate (n*4) ' ' 

singleton :: a -> Tree a
singleton x = Node x EmptyTree EmptyTree 

treeInsert :: (Ord a) => a -> Tree a -> Tree a
treeInsert x EmptyTree = singleton x
treeInsert x (Node a left right) 
	| x == a = Node x left right
	| x < a  = Node a (treeInsert x left) right
	| x > a  = Node a left (treeInsert x right) 

treeElem :: (Ord a) => a -> Tree a -> Bool
treeElem x EmptyTree = False
treeElem x (Node a left right)
	| x == a = True
	| x < a  = treeElem x left
	| x > a  = treeElem x right

flatten :: Tree a -> [a]
flatten EmptyTree = []
flatten (Node a left right) = (flatten left) ++ [a] ++ (flatten right)
