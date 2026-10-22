from fastapi import APIRouter

router = APIRouter()

@router.get("/documents")
def list_documents():
    """Return metadata for all available document generators."""
    return {
        "documents": [
            {"slug": "rent-receipt-generator", "name": "Rent Receipt", "category": "Rental", "keywords": "rent receipt generator, HRA exemption, rent receipt format"},
            {"slug": "rental-agreement-generator", "name": "Rental Agreement", "category": "Rental", "keywords": "rental agreement format, 11 month rental agreement, rent agreement"},
            {"slug": "salary-slip-generator", "name": "Salary Slip", "category": "HR", "keywords": "salary slip format, payslip generator, salary slip download"},
            {"slug": "experience-letter-generator", "name": "Experience Letter", "category": "HR", "keywords": "experience letter format, experience certificate"},
            {"slug": "relieving-letter-generator", "name": "Relieving Letter", "category": "HR", "keywords": "relieving letter format, relieving letter from company"},
            {"slug": "offer-letter-generator", "name": "Offer Letter", "category": "HR", "keywords": "offer letter format, job offer letter template"},
            {"slug": "noc-letter-generator", "name": "NOC Letter", "category": "Legal", "keywords": "NOC format, no objection certificate format"},
            {"slug": "appointment-letter-generator", "name": "Appointment Letter", "category": "HR", "keywords": "appointment letter format, joining letter format"},
            {"slug": "invoice-generator", "name": "Invoice", "category": "Business", "keywords": "invoice generator free, GST invoice format, bill generator"},
            {"slug": "bonafide-certificate-generator", "name": "Bonafide Certificate", "category": "Legal", "keywords": "bonafide certificate format, bonafide certificate for students"},
            {"slug": "power-of-attorney-generator", "name": "Power of Attorney", "category": "Legal", "keywords": "power of attorney format, general power of attorney"},
            {"slug": "leave-application-generator", "name": "Leave Application", "category": "HR", "keywords": "leave application format, leave letter format"},
            {"slug": "resignation-letter-generator", "name": "Resignation Letter", "category": "HR", "keywords": "resignation letter format, resignation letter sample"},
            {"slug": "authorization-letter-generator", "name": "Authorization Letter", "category": "Legal", "keywords": "authorization letter format, authority letter format"},
            {"slug": "salary-certificate-generator", "name": "Salary Certificate", "category": "HR", "keywords": "salary certificate format, salary certificate for loan"},
            {"slug": "affidavit-generator", "name": "Affidavit", "category": "Legal", "keywords": "affidavit format, affidavit for name change, address affidavit"},
            {"slug": "partnership-deed-generator", "name": "Partnership Deed", "category": "Business", "keywords": "partnership deed format, partnership agreement India"},
            {"slug": "employee-warning-letter-generator", "name": "Warning Letter", "category": "HR", "keywords": "employee warning letter format, warning letter for misconduct"},
            {"slug": "internship-certificate-generator", "name": "Internship Certificate", "category": "HR", "keywords": "internship certificate format, internship completion certificate"},
            {"slug": "character-certificate-generator", "name": "Character Certificate", "category": "Legal", "keywords": "character certificate format, character certificate for government job"},
            {"slug": "increment-letter-generator", "name": "Increment Letter", "category": "HR", "keywords": "increment letter format, salary increment letter sample"},
            {"slug": "promotion-letter-generator", "name": "Promotion Letter", "category": "HR", "keywords": "promotion letter format, employee promotion letter sample"},
            {"slug": "address-proof-letter-generator", "name": "Address Proof Letter", "category": "Legal", "keywords": "address proof letter format, address proof letter from employer"},
        ]
    }
