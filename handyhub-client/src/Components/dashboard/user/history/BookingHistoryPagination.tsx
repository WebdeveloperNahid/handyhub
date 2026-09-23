import { Pagination } from "@heroui/react";

interface BookingHistoryPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const BookingHistoryPagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: BookingHistoryPaginationProps) => {
    return (
        <div className="flex justify-center pt-2">
            <Pagination>
                <Pagination.Content>
                    <Pagination.Item>
                        <Pagination.Previous
                            isDisabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            Previous
                        </Pagination.Previous>
                    </Pagination.Item>

                    {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;

                        return (
                            <Pagination.Item key={page}>
                                <Pagination.Link
                                    isActive={currentPage === page}
                                    onClick={() => onPageChange(page)}
                                >
                                    {page}
                                </Pagination.Link>
                            </Pagination.Item>
                        );
                    })}

                    <Pagination.Item>
                        <Pagination.Next
                            isDisabled={currentPage === totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            Next
                        </Pagination.Next>
                    </Pagination.Item>
                </Pagination.Content>
            </Pagination>
        </div>
    );
};

export default BookingHistoryPagination;