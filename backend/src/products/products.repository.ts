async softDelete(productId: string) {
  return this.prisma.product.update({
    where: { id: productId },
    data: {
      deleted_at: new Date()
    }
  });
}
