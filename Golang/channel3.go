package main
import (
	"fmt"
)
func total(csend chan int, crecv chan int) {
	n := <- csend
	t  := 0
	for i := 1; i<=n; i++ {
		t += i
	}
	crecv <- t
}

func main(){
	csend := make(chan int)
	crecv := make(chan int)
	go total(csend, crecv)
	csend <- 100
	fmt.Println("total:", <-crecv)
}

