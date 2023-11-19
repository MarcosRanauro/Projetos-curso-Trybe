def merge(left_arr, right_arr):
    merged_arr = []
    index_left, index_right = 0, 0

    while index_left < len(left_arr) and index_right < len(right_arr):
        if left_arr[index_left] < right_arr[index_right]:
            merged_arr.append(left_arr[index_left])
            index_left += 1
        else:
            merged_arr.append(right_arr[index_right])
            index_right += 1

    merged_arr.extend(left_arr[index_left:])
    merged_arr.extend(right_arr[index_right:])

    return merged_arr


def merge_sort(array):
    if len(array) <= 1:
        return array

    mid = len(array) // 2
    left_array = array[:mid]
    right_array = array[mid:]

    return merge(merge_sort(left_array), merge_sort(right_array))


def is_anagram(first_str, second_str):
    def normalize_string(s):
        return "".join(merge_sort(list(s.lower().replace(" ", ""))))

    if not first_str and not second_str:
        return ("", "", False)

    sorted_str1 = normalize_string(first_str)
    sorted_str2 = normalize_string(second_str)

    return (sorted_str1, sorted_str2, sorted_str1 == sorted_str2)
