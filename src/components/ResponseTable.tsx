
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MoreHorizontal, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  ArrowDownAZ, 
  ArrowUpZA 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

export interface Response {
  id: string;
  date: Date;
  customer: string;
  answers: Record<string, string>;
}

interface ResponseTableProps {
  responses: Response[];
  questions: { id: string; label: string }[];
}

const ResponseTable = ({ responses, questions }: ResponseTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 10;

  // Filter and sort responses
  const filteredResponses = responses.filter(response => 
    response.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Object.values(response.answers).some(answer => 
      typeof answer === 'string' && answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedResponses = [...filteredResponses].sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'asc' 
        ? a.date.getTime() - b.date.getTime()
        : b.date.getTime() - a.date.getTime();
    } else if (sortBy === 'customer') {
      return sortDirection === 'asc'
        ? a.customer.localeCompare(b.customer)
        : b.customer.localeCompare(a.customer);
    }
    return 0;
  });

  const paginatedResponses = sortedResponses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return (
    <Card className="animate-fade-in">
      <div className="p-4 flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search responses..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {Math.min(filteredResponses.length, (page - 1) * itemsPerPage + 1)}-
            {Math.min(filteredResponses.length, page * itemsPerPage)} of {filteredResponses.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">
              <Button 
                variant="ghost" 
                size="sm" 
                className="font-semibold -ml-2 flex items-center gap-1"
                onClick={() => toggleSort('date')}
              >
                Date
                {sortBy === 'date' && (
                  sortDirection === 'asc' ? <ArrowDownAZ className="h-3.5 w-3.5" /> : <ArrowUpZA className="h-3.5 w-3.5" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                size="sm" 
                className="font-semibold -ml-2 flex items-center gap-1"
                onClick={() => toggleSort('customer')}
              >
                Customer
                {sortBy === 'customer' && (
                  sortDirection === 'asc' ? <ArrowDownAZ className="h-3.5 w-3.5" /> : <ArrowUpZA className="h-3.5 w-3.5" />
                )}
              </Button>
            </TableHead>
            {questions.slice(0, 3).map(question => (
              <TableHead key={question.id}>{question.label}</TableHead>
            ))}
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedResponses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5 + questions.length} className="text-center py-8 text-muted-foreground">
                No responses found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedResponses.map(response => (
              <TableRow key={response.id} className="group transition-colors">
                <TableCell className="font-medium">{format(response.date, 'MMM d, yyyy')}</TableCell>
                <TableCell>{response.customer}</TableCell>
                {questions.slice(0, 3).map(question => (
                  <TableCell key={question.id}>
                    {typeof response.answers[question.id] === 'string'
                      ? response.answers[question.id]
                      : 'N/A'}
                  </TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Export response</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ResponseTable;
