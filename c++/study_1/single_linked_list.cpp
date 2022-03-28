
#include <iostream>

using namespace std;

/*
* SLL을 class와 object로 구현
* 단, Node를 SLL에 붙이는 코드를 Node가 갖도록 한다.
*/


class Node {
public:
	int n;
	Node* next;

	Node(int v) : n(v), next(nullptr) {

	}
	void addToSLL(Node*& _head) {
		if (_head == nullptr) {
			_head = this;
		}
		else {
			Node* temp = _head;
			while (temp->next != nullptr) {
				temp = temp->next;
			}
			temp->next = this;
		}
	}
	void showN() {
		cout << "n is: " << n << endl;
	}
};

class My_SLL {
public:
	Node* head;
	Node* last;
	int cnt;

	My_SLL() : head(nullptr), last(nullptr), cnt(0) {

	}
	void addNode(Node* _new_one) {
		if (head == 0) {
			head = _new_one;
			last = _new_one;
			cnt = 1;
		}
		else {
			last->next = _new_one;
			last = _new_one;
			cnt++;
		}
	}
	void showAll() {
		Node* temp = head;
		while (temp != nullptr) {
			cout << temp->n << endl;
			temp = temp->next;
		}
	}
};

void single_linked_list() {
	Node* a = new Node(777);
	Node* b = new Node(888);


	My_SLL my_sll;
	my_sll.addNode(a);
	my_sll.addNode(b);

	my_sll.showAll();
}