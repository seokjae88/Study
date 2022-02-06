
#include <iostream>
#include <climits>

using namespace std;

void data_type() {
	unsigned short s_var;
	unsigned int i_var;
	unsigned ui_var;
	unsigned long l_var;
	unsigned long long ll_var;

	cout << "short max: " << SHRT_MAX << endl;
	cout << "unsigned short max: " << USHRT_MAX << endl;
	cout << "int max: " << INT_MAX << endl;
	cout << "unsigned int max: " << UINT_MAX << endl;
	cout << "long long max: " << LLONG_MAX << endl;
	cout << "unsigned long long max: " << ULLONG_MAX << endl;

	int a = 10;
	int b = 0x10;
	int c = 010;

	cout << a << endl;
	cout << hex; // 숫자 출력 형식을 16진수
	cout << b << endl;
	cout << oct; // 8진수로 출력
	cout << c << endl;
	cout << dec;
	cout << a << " " << b << " " << c << endl;

	bool bb = true;
	bool cc = false;

	cout << boolalpha;
	cout << bb << endl;
	cout << cc << endl;
	cout << noboolalpha;
	cout << bb << endl;
	cout << cc << endl;


#define PI_VALUE 3.141592 // type 지정이 안되기때문에 const를 쓰는게 더 좋다!

	const double pi_value = 3.141592;
	
}