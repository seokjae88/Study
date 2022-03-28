
#include <iostream>

using namespace std;

/*
* ra = k <=> int& ra = k 두가지의 경우 헷갈리지 말기!
* 
* 왜 사용하는가? 
* 함수 호출시 사이즈가 큰 변수의 복사를 피하기 위해
* 포인터의 위험을 피하기 위해
*/

void callByValue(int n) {
	n = 100;
	return;
}
void callByAddress(int *n) {
	*n = 100;

	// n = n + 10; 포인터의 위험!
	return;
}
void callByReference(int& n) {
	n = 200;
	return;
}
void reference_variable() {
	int n(10);
	callByValue(n);
	cout << "n: " << n << endl;
	callByAddress(&n);
	cout << "n: " << n << endl;
	callByReference(n);
	cout << "n: " << n << endl;

	//int a = 55;
	//int& ra = a;

	//cout << "a : " << a << endl;
	//cout << "ra : " << ra << endl;

	//int k = 50;
	//ra = k;
	//cout << "a : " << a << endl;
	//cout << "ra : " << ra << endl;
	//cout << "k : " << k << endl;

	//ra = 100;
	//cout << "a : " << a << endl;
	//cout << "ra : " << ra << endl;
	//cout << "k : " << k << endl;

	//ra = 78;
	//cout << "a : " << a << endl;
	//cout << "ra : " << ra << endl;

	//int& rra = a;
	//rra = 56;
	//cout << "a : " << a << endl;
	//cout << "ra : " << ra << endl;
	//cout << "rra : " << rra << endl;

	//int& ka = rra;
	//ka = 89;
	//cout << "a : " << a << endl;
	//cout << "ra : " << ra << endl;
	//cout << "rra : " << rra << endl;
	//cout << "ka : " << ka << endl;

}