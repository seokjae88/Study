
#include <iostream>

using namespace std;

/*
* ra = k <=> int& ra = k �ΰ����� ��� �򰥸��� ����!
* 
* �� ����ϴ°�? 
* �Լ� ȣ��� ����� ū ������ ���縦 ���ϱ� ����
* �������� ������ ���ϱ� ����
*/

void callByValue(int n) {
	n = 100;
	return;
}
void callByAddress(int *n) {
	*n = 100;

	// n = n + 10; �������� ����!
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