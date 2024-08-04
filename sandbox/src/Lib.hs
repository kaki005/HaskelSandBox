quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) = 
    let s = [a | a <- xs, a<=x]
        l = [a | a <- xs, a>x]
    in quicksort s ++ [x] ++ quicksort l
