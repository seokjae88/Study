
#include <iostream>
#include <vector>

#include "study.hpp"

/*
## sortArrayByParity ##
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

Input: nums = [0]
Output: [0]
*/


class Solution_1 : public Solution {
private:
    int oddMove(int n, int start, std::vector<int>& nums) {
        for (int i = start; i < nums.size(); i++) {
            if (nums[i] % 2) {
                return oddMove(n, i + 1, nums);
            }
            else {
                int tmp = nums[i];
                nums[i] = n;
                return tmp;
            }
        }
        return -1;
    }
    std::vector<int> sortArrayByParity(std::vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] % 2) {
                int n = oddMove(nums[i], i + 1, nums);
                if (n == -1) {
                    return nums;
                }
                nums[i] = n;
            }
        }
        return nums;
    }
public:
    void run() {
        //std::vector<int> nums = { 3,1,2,4 };
        std::vector<int> nums = { 0 };
        std::vector<int> ret = this->sortArrayByParity(nums);
        std::cout << "[ ";
        for (auto num : ret) {
            std::cout << num << " ";
        }
        std::cout << "]";
    }
};